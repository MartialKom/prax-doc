import { Injectable } from '@angular/core';
import { client, ID, account } from 'src/lib/appwrite';
import { Databases, Query } from 'appwrite';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FrontEndService {

  constructor() { }

  async getHeroText(){
    try {
      const databases = new Databases(client);

      const hero = await databases.listDocuments(
        environment.databaseId,
        environment.collectionIdFrontEnd,
        [Query.orderAsc('hero-indice')]
      );

      return hero.documents;
    } catch (error: any) {
      console.error('Failed to get hero-section text:', error.message);
      return [];
    }
  }

  async updateHeroText(data: any, id: any){
    const databases = new Databases(client);

    const hero = await databases.updateDocument(
      environment.databaseId,
      environment.collectionIdFrontEnd,
      id,
      {
        'hero-indice': data.heroIndice,
        'hero-heading1': data.heroHeading1,
        'hero-heading2': data.heroHeading2,
        'hero-heading3': data.heroHeading3,
        'hero-headingText': data.heroHeadingText 
      }
    );

    return hero;
  }

  async updateCardText(data: any, id: any){
    const databases = new Databases(client);

    const cards = await databases.updateDocument(
      environment.databaseId,
      environment.collectionIdFrontEnd,
      id,
      {
        'infoCard1-Title': data[0].title,
        'infoCard2-Title': data[1].title,
        'infoCard3-Title': data[2].title,
        'infoCard4-Title': data[3].title,
        'infoCard1-Text': data[0].text, 
        'infoCard2-Text': data[1].text, 
        'infoCard3-Text': data[2].text, 
        'infoCard4-Text': data[3].text 
      }
    );

    return cards;
  }
 async updateAboutText(data: any, id: any){
    const databases = new Databases(client);

    const about = await databases.updateDocument(
      environment.databaseId,
      environment.collectionIdFrontEnd,
      id,
      {
        'about-indice': data.aboutIndice,
        'about-header': data.aboutTitle,
        'about-text': data.aboutText,
        'about-text2': data.aboutText2
      }
    );

    return about;
  }

  async updateServiceText(data: any, id: any){
    const databases = new Databases(client);

    const service = await databases.updateDocument(
      environment.databaseId,
      environment.collectionIdFrontEnd,
      id,
      {
        'service-text': data.serviceText,
        'service-title': data.serviceTitle,
      }
    );

    return service;
  }


  async updateTeamText(data: any, id: any){
    const databases = new Databases(client);

    const service = await databases.updateDocument(
      environment.databaseId,
      environment.collectionIdFrontEnd,
      id,
      {
        'team-text': data.teamText,
        'team-title': data.teamTitle,
      }
    );

    return service;
  }

  async updateAboutImg(data: any, id: any){
    const databases = new Databases(client);

    const about = await databases.updateDocument(
      environment.databaseId,
      environment.collectionIdFrontEnd,
      id,
      {
        'about-img': data
      }
    );

    return about;
  }

}
