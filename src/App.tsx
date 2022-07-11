import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonIcon, IonLabel, IonRouterOutlet, IonSpinner, IonTabBar, IonTabButton, IonTabs, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { addCircle, ellipse, home, logIn, person, square, triangle } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { getCurrentUser } from './firebaseConfig'
import { useStore } from 'react-redux';
import Dashboard from './pages/Dashboard';
import { useDispatch } from 'react-redux';
import { setUserState } from './redux/actions';
import AddNewPost from './pages/AddNewPost';
import EditPost from './pages/EditPost';
import Post from './pages/Post';
import './pages/Home.css'

setupIonicReact();



const RoutingSystem: React.FC = () => {
  return (
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/dashboard">
            <Dashboard />
          </Route>
          <Route exact path="/addPost">
            <AddNewPost />
          </Route>
          <Route exact path="/editPost/:id">
            <EditPost />
          </Route>
          <Route exact path="/post/:id">
            <Post />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
            <IonTabButton tab="home" href="/home">
              <IonIcon icon={home} />
              <IonLabel>Główna</IonLabel>
            </IonTabButton>
            <IonTabButton tab="addPost" href="/addPost">
              <IonIcon icon={addCircle} />
              <IonLabel>Dodaj post</IonLabel>
            </IonTabButton>
            <IonTabButton tab="login" href="/login">
              <IonIcon icon={logIn} />
              <IonLabel>Logowanie</IonLabel>
            </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  )
}

const App: React.FC = () => {

  const [busy, setBusy] = useState(true)
  const dispatch = useDispatch()
  const [isOn, setIsOn] = useState("none")
  
  useEffect(() => {
    getCurrentUser().then((user: any) => {
      if(user) {
        dispatch(setUserState(user.email))
        setIsOn("none")
        //window.history.replaceState({}, '', '/dashboard')
      }
      else {
        setIsOn("true")
        //window.history.replaceState({}, '', '/')
      }
      setBusy(false)
    })
  }, [])

  return (
  <IonApp>
    {busy ? <IonSpinner/> :
          <IonReactRouter>
          <IonTabs>
            <IonRouterOutlet>
              <Route exact path="/home">
                <Home />
              </Route>
              <Route exact path="/">
                <Redirect to="/home" />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/register">
                <Register />
              </Route>
              <Route exact path="/dashboard">
                <Dashboard />
              </Route>
              <Route exact path="/addPost">
                <AddNewPost />
              </Route>
              <Route exact path="/editPost/:id">
                <EditPost />
              </Route>
              <Route exact path="/post/:id">
                <Post />
              </Route>
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
                <IonTabButton tab="home" href="/home">
                  <IonIcon icon={home} />
                  <IonLabel>Główna</IonLabel>
                </IonTabButton>
                <IonTabButton tab="addPost" href="/addPost">
                  <IonIcon icon={addCircle} />
                  <IonLabel>Dodaj post</IonLabel>
                </IonTabButton>
                <IonTabButton tab="login" href="/login" style={{display: isOn}}>
                  <IonIcon icon={logIn} />
                  <IonLabel>Logowanie</IonLabel>
                </IonTabButton>
                <IonTabButton tab="dashboard" href="/dashboard" style={{display: isOn == "true" ? "none" : "true"}}>
                  <IonIcon icon={person} />
                  <IonLabel>Panel użytkownika</IonLabel>
                </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonReactRouter>
    }
  </IonApp>
  )
};

export default App;
