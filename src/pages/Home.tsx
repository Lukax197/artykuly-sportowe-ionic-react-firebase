import { IonAvatar, IonButton, IonContent, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import { star } from 'ionicons/icons';
import { Link } from 'react-router-dom';
import { deletePost, getAllPosts } from '../firebaseConfig';

const Home: React.FC = () => {
  const [posty, setPosty] = useState<Array<any>>([])
  const [searchTerm, setSearchTerm] = useState('')

  async function del(params: any) {
    await deletePost(params.id)
    window.location.href = "/"
  }

  useEffect(() => {
    var dok = new Array()

    getAllPosts().then((dokumenty: any) => {
        for(var i=0; i<dokumenty.docs.length; i++) {
            dok.push({id: dokumenty.docs[i].id, tytul: dokumenty.docs[i].get("name"), zdjecie: dokumenty.docs[i].get("zdjecie")})
        }
        setPosty(dok)
      });

    }, []);

    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle className='naglowek tool'> <Link to="/home"> <img src="./assets/icon/icon.png" className='ikona'/> </Link> <label className='napis'> MeczYK </label> 
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className='ion-padding'>
          <IonItem className='home-title'> <h1> Aktualności </h1> </IonItem>
          <div className='searchDiv'> <input className="search" type="text" placeholder="Wyszukaj..." name="search" onChange={(e) => {setSearchTerm(e.target.value)}}/> </div>
          <IonList>
            {posty.filter((val) => {
              if(searchTerm == "") {
                  return val
              } else if (val.tytul.toLowerCase().includes(searchTerm.toLowerCase())) {
                return val
              }
              }).map((elem, i) => (
              <IonItemSliding key={i}>
                <IonItem className='list-item' routerLink={`/post/${elem.id}`}>
                    <IonLabel className='ion-padding post-list sliding-item'>
                      <IonImg className='zdjecie' src={elem.zdjecie}/>
                      <IonTitle className='tytul ion-text-wrap'> {elem.tytul} </IonTitle>
                    </IonLabel>
                </IonItem>
                <IonItemOptions side="start">
                  <IonItemOption color="danger" onClick={() => del({id: elem.id, index: i})}>
                    Usuń
                  </IonItemOption>
                    <IonItemOption routerLink={`/editPost/${elem.id}`}>
                      Edytuj
                    </IonItemOption>
                </IonItemOptions>
              </IonItemSliding>
            ))}
          </IonList>
        </IonContent>
      </IonPage>
    );
  };

export default Home;
