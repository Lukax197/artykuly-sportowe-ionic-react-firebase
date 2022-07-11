import { IonAvatar, IonButton, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonLoading, IonPage, IonText, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { addPost } from '../firebaseConfig'
import './Home.css';
import './Form.css';
import { toast } from '../toast';

const AddNewPost: React.FC = () => {

  const [tytul, setTytul] = useState('')
  const [tresc, setTresc] = useState('')
  const [zdjecie, setZdjecie] = useState('')

  async function dodaj() {
    if(tytul != '' && tresc != '' && zdjecie != ''){
      var newPost = {name: tytul, tresc: tresc, zdjecie: "./"+zdjecie}
      await addPost(newPost)
      window.location.href = "/"
    }
    else {
      toast("Żadne z pól nie może być puste!")
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className='naglowek tool'> <Link to="/home"> <img src="./assets/icon/icon.png" className='ikona'/> </Link> <label className='napis'> Dodaj nowy post </label> </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding cont'>
        <div className='formularz'>
          <IonInput className='formInput' placeholder='Wpisz tytuł' onIonChange={(e: any) => {setTytul(e.target.value)}}/>
          <IonTextarea rows={15} className='formInput text-area' placeholder='Wpisz treść' onIonChange={(e: any) => {setTresc(e.target.value)}}/>
          <div className='formularz-end'>
            <div className='formularz2'>
              <img className='zdjecie-podglad' src={zdjecie}/>
              <input className='formInput fileIn' type="file" accept='.jpg, .png' onChange={(e: any) => {setZdjecie(e.target.value.split("\\")[2])}}/> <br/>
              <IonButton color="success" onClick={dodaj}> Dodaj </IonButton>
            </div>
          </div>
        </div>
      </IonContent> 
    </IonPage>
  );
};

export default AddNewPost;