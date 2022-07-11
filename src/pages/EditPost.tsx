import { IonAvatar, IonButton, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonLoading, IonPage, IonText, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { addPost, editPost, getPostByID } from '../firebaseConfig'
import { toast } from '../toast';
import './Home.css';
import './Form.css';
import { refresh } from 'ionicons/icons';
import { reload } from 'firebase/auth';

const EditPost: React.FC = () => {

    const param: any = useParams()
    const history = useHistory()

    const [tytul, setTytul] = useState('')
    const [tresc, setTresc] = useState('')
    const [zdjecie, setZdjecie] = useState('')
  
    async function edytuj() {
      if(tytul != '' && tresc != '' && zdjecie != ''){
        var editedPost = {name: tytul, tresc: tresc, zdjecie: zdjecie}
        await editPost(param.id, editedPost)
        window.location.href = "/"
      }
      else {
        toast("Żadne z pól nie może być puste!")
      }
    }

    useEffect(() => {
      getPostByID(param.id).then((data: any) => {
        setTytul(data.name)
        setTresc(data.tresc)
        setZdjecie(data.zdjecie)
      })

      console.log(param.id)
    }, [])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <IonTitle className='naglowek tool'> <Link to="/home"> <img src="./assets/icon/icon.png" className='ikona'/> </Link> <label className='napis'> Edytuj post </label> </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding cont'>
      <div className='formularz'>
          <IonInput className='formInput' placeholder='Wpisz tytuł' onIonChange={(e: any) => {setTytul(e.target.value)}} value={tytul}/>
          <IonTextarea rows={15} className='formInput text-area' placeholder='Wpisz treść' onIonChange={(e: any) => {setTresc(e.target.value)}} value={tresc}/>
          <div className='formularz-end'>
            <div className='formularz2'>
              <img className='zdjecie-podglad' src={zdjecie}/>
              <input className='formInput fileIn' type="file" accept='.jpg, .png' onChange={(e: any) => {setZdjecie(e.target.value.split("\\")[2])}}/> <br/>
              <IonButton color="success" onClick={edytuj}> Edytuj </IonButton>
            </div>
          </div>
        </div>
      </IonContent> 
    </IonPage>
  );
};

export default EditPost;