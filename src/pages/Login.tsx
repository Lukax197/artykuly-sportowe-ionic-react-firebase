import { IonAvatar, IonButton, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonLoading, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import ExploreContainer from '../components/ExploreContainer';
import './Login.css';
import './Home.css';
import { star } from 'ionicons/icons';
import { Link, useHistory } from 'react-router-dom';
import { loginUsr } from '../firebaseConfig';
import { toast } from '../toast';
import { setUserState } from '../redux/actions';
import { useDispatch } from 'react-redux';
import './Form.css';

const Login: React.FC = () => {

  const [busy, setBusy] = useState<boolean>(false)
  const dispatch = useDispatch()
  const history = useHistory()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  function showNotification() {
    const notification = new Notification("MeczYK",{
      body: "Udało Ci się zalogować!",
      icon: "assets/icon/favicon.png"
    });
  }

  async function login() {
    setBusy(true)
    const res: any = await loginUsr(username, password)

    if(!res) {
      toast('Niepoprawne dane logowania')
    }
    else {
      dispatch(setUserState(res.user.email))
      window.location.href = '/dashboard'
      toast('Udało Ci się zalogować!')
      showNotification()
    }
    setBusy(false)
  }
  
  return (
    <IonPage>
      <IonHeader>
      <IonToolbar>
          <IonTitle className='naglowek tool'> <Link to="/home"> <img src="./assets/icon/icon.png" className='ikona'/> </Link> <label className='napis'> Logowanie </label></IonTitle>
        </IonToolbar>
      </IonHeader>
      {busy && <IonLoading message="Proszę czekać..." duration={0} isOpen={busy}/>}
      <IonContent className='ion-padding cont'>
        <div className='formularz'>
          <IonInput className='formInput' placeholder='Login' onIonChange={(e: any) => setUsername(e.target.value)}/>
          <IonInput className='formInput' placeholder='Hasło' type='password' onIonChange={(e: any) => setPassword(e.target.value)}/>
          <div className='formularz-end'>
            <IonButton style={{marginTop: "20px"}} color="success" onClick={login}> Zaloguj się </IonButton>
            <p> Jesteś nowy? <Link to="/register"> Zarejestruj się </Link> </p>
          </div>
        </div>
      </IonContent> 
    </IonPage>
  );
};

export default Login;
