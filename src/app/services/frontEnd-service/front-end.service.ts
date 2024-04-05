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
}
