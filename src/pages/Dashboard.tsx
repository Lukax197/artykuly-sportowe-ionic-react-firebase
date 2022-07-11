import { IonAvatar, IonButton, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonLoading, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { logoutUser } from '../firebaseConfig'
import './Home.css';

const Dashboard: React.FC = () => {

  const username = useSelector((state: any) => state.user.username)
  const [busy, setBusy] = useState(false)

  const history = useHistory()

  async function logout() {
    setBusy(true)
    await logoutUser()
    setBusy(false)
    window.location.href = '/'
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <IonTitle className='naglowek tool'> <Link to="/home"> <img src="./assets/icon/icon.png" className='ikona'/> </Link> <label className='napis'> Panel użytkownika </label> </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding cont'>
        <IonLoading message="Wylogowywanie..." duration={0} isOpen={busy} />
        <div className='dashboardCont'>
          <p className='greeting'> Witaj {username}! </p>
          <IonButton color="success" onClick={logout}> Wyloguj się </IonButton>
        </div>
      </IonContent> 
    </IonPage>
  );
};

export default Dashboard;