import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonGrid, IonItem, IonNote, IonRow } from '@ionic/react'
import React, { useEffect, useState } from 'react'
import { connectionBackend } from '../BackEnd/connectionBackend';
import '../styles/ViewBlogs.css';

interface BlogItem {
    id: string;
    title: string;
    summary: string;
    category: string;
}

interface BlogResponse {
    posts: BlogItem[];
}

const ViewBlogs: React.FC = () => {
    const [blog, getBlog] = useState<BlogResponse>({ posts: [] });

    useEffect(() => {
        const handleGetBlogs = async () => {
            try {
                const { data } = await connectionBackend.get('/getPost');
                getBlog(data);
                console.log("Blogs obtenidos", data);
            } catch (error) {
                console.error("Error al obtener los blogs", error);
                alert("Error al obtener los blogs");
            }
        }
        handleGetBlogs();
    }, [])

    return (
        <IonItem lines="none" className="blogs-wrapper">
            <IonGrid fixed>
                <IonRow className="blogs-row">
                    {blog?.posts?.map((blogItem: BlogItem) => (
                        <IonCol
                            key={blogItem.id}
                            size="12" sizeSm="6" sizeMd="4" sizeLg="3"
                        >
                            <IonCard className="blog-card">
                                <IonCardHeader>
                                    <IonCardTitle>{blogItem.title}</IonCardTitle>
                                </IonCardHeader>

                                <IonCardContent>
                                    <p className="summary">{blogItem.summary}</p>
                                    <p className="category">
                                        <strong>Categoría:</strong> {blogItem.category}
                                    </p>
                                    <IonButton>Ver mas</IonButton>
                                </IonCardContent>
                            </IonCard>
                        </IonCol>
                    ))}
                </IonRow>
            </IonGrid>
        </IonItem>

    );
}

export default ViewBlogs;
