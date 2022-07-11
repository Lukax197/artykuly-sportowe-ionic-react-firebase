import { IonAvatar, IonButton, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonLoading, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import ExploreContainer from '../components/ExploreContainer';
import './Register.css';
import './Home.css';
import './Form.css';
import { star } from 'ionicons/icons';
import { Link } from 'react-router-dom';
import { toast } from '../toast';
import { registerUser } from '../firebaseConfig';

const Register: React.FC = () => {

  const [busy, setBusy] = useState<boolean>(false)
  
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [cpassword, setCPassword] = useState('')

  async function register() {
    setBusy(true)
    
    if(password !== cpassword) {
      setBusy(false)
      return toast('Hasła nie są takie same!')
    }

    if(username.trim() === '' || password.trim() === '') {
      setBusy(false)
      return toast('Login i hasło są wymagane!')
    }

    const res = await registerUser(username, password)

    if(res) {
      toast("Udało Ci się zarejestrować!")
      window.location.href = '/dashboard'
    }
    else {
      toast("Nie udało Ci się zarejestrować!")
    }

    setBusy(false)
  }
  
  return (
    <IonPage>
      <IonHeader>
      <IonToolbar>
          <IonTitle className='naglowek tool'> <Link to="/home"> <img src="./assets/icon/icon.png" className='ikona'/> </Link> <label className='napis'> Rejestracja </label></IonTitle>
        </IonToolbar>
      </IonHeader>
      {busy && <IonLoading message="Proszę czekać..." duration={0} isOpen={busy}/>}
      <IonContent className='ion-padding cont'>
      <div className='formularz'>
        <IonInput className='formInput' placeholder='Login' onIonChange={(e: any) => setUsername(e.target.value)}/>
        <IonInput className='formInput' placeholder='Hasło' type='password' onIonChange={(e: any) => setPassword(e.target.value)}/>
        <IonInput className='formInput' placeholder='Powtórz hasło' type='password' onIonChange={(e: any) => setCPassword(e.target.value)}/>
        <div className='formularz-end'>
          <IonButton style={{marginTop: "20px"}} color="success" onClick={register}> Zarejestruj się </IonButton>
          <p> Masz już konto? <Link to="/login"> Zaloguj się </Link> </p>
        </div>
      </div>
      </IonContent> 
    </IonPage>
  );
};

export default Register;
