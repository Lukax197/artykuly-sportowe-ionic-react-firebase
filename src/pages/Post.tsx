import { IonAvatar, IonButton, IonContent, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonLoading, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { addPost, getPostByID } from '../firebaseConfig'
import './Home.css';
import './Post.css';

const Post: React.FC = () => {

  const param: any = useParams()
  const [post, setPost] = useState<any>()

  useEffect(() => {
    getPostByID(param.id).then((data) => {
      setPost(data)
    })
  }, [])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className='naglowek tool'> <Link to="/home"> <img src="./assets/icon/icon.png" className='ikona' /> </Link> <label className='napis'> MeczYK </label> </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding cont'>
        <div className='post'>
          <IonText className='post-tytul'> {post?.name} </IonText>
          <IonImg className='post-zdjecie' src={post?.zdjecie}/>
          <IonText className='post-tresc'> {post?.tresc} </IonText>
        </div>
      </IonContent> 
    </IonPage>
  );
};

export default Post;