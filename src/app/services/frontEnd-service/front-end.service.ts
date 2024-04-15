import { Injectable } from '@angular/core';
import { client, ID, account } from 'src/lib/appwrite';
import { Databases, Query } from 'appwrite';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FrontEndService {
  constructor() {}

  async getHeroText() {
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

  async getTeam() {
    try {
      const databases = new Databases(client);

      const team = await databases.listDocuments(
        environment.databaseId,
        environment.collectionIdTeam
      );

      return team.documents;
    } catch (error: any) {
      console.error('Failed to get all team elements:', error.message);
      return [];
    }
  }

  async updateHeroText(data: any, id: any) {
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
        'hero-headingText': data.heroHeadingText,
      }
    );

    return hero;
  }

  async updateCardText(data: any, id: any) {
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
        'infoCard4-Text': data[3].text,
      }
    );

    return cards;
  }
  async updateAboutText(data: any, id: any) {
    const databases = new Databases(client);

    const about = await databases.updateDocument(
      environment.databaseId,
      environment.collectionIdFrontEnd,
      id,
      {
        'about-indice': data.aboutIndice,
        'about-header': data.aboutTitle,
        'about-text': data.aboutText,
        'about-text2': data.aboutText2,
      }
    );

    return about;
  }

  async updateServiceText(data: any, id: any) {
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

  async getServices() {
    const databases = new Databases(client);

    const services = await databases.listDocuments(
      environment.databaseId,
      environment.collectionIdSerices
    );

    return services.documents;
  }

  async updateTeamText(data: any, id: any) {
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
  async updateTestimonialsText(data: any, id: any) {
    const databases = new Databases(client);

    const testimonial = await databases.updateDocument(
      environment.databaseId,
      environment.collectionIdFrontEnd,
      id,
      {
        'testimonial-text': data.testimonialsText,
        'testimonial-title': data.testimonialsTitle,
      }
    );

    return testimonial;
  }
  async updateAboutImg(data: any, id: any) {
    const databases = new Databases(client);

    const about = await databases.updateDocument(
      environment.databaseId,
      environment.collectionIdFrontEnd,
      id,
      {
        'about-img': data,
      }
    );

    return about;
  }

  async updateService(data: any, img: any, id: any) {
    const databases = new Databases(client);

    var body: any;
    if (img) {
      body = {
        description: data.description,
        title: data.title,
        image: img,
      };
    } else
      body = {
        description: data.description,
        title: data.title,
      };

    const service = await databases.updateDocument(
      environment.databaseId,
      environment.collectionIdSerices,
      id,
      body
    );

    return service;
  }

  async updateAtestimonial(data: any, id: any) {
    const databases = new Databases(client);

    const testimonial = await databases.updateDocument(
      environment.databaseId,
      environment.collectionIdFrontEnd,
      id,
      data
    );

    return testimonial;
  }

  async updateTeam(body: any, idDoc: any, image: any) {
    const databases = new Databases(client);

    var data: any;

    if (image)
      data = {
        name: body.name,
        speciality: body.speciality,
      };
    else
      data = {
        name: body.name,
        speciality: body.speciality,
        image: image
      };

    const team = await databases.updateDocument(
      environment.databaseId,
      environment.collectionIdTeam,
      idDoc,
      data
    );

    return team
  }

  async getLinks(){
    const databases = new Databases(client);

    const links = await databases.listDocuments(
      environment.databaseId,
      environment.collectionIdLink,
      [Query.orderAsc('position')]
    );

    return links.documents;
  }

  async getTitleLinks(){
    const databases = new Databases(client);

    const titleLinks = await databases.listDocuments(
      environment.databaseId,
      environment.collectionIdTitleLink,
      [Query.orderAsc('position')]
    );

    return titleLinks.documents;
  }

  async updateLink(id: any, data: any){
    const databases = new Databases(client);

    const link = await databases.updateDocument(
      environment.databaseId,
      environment.collectionIdLink,
      id,
      {
        name: data.name,
        url: data.url
      }
    );

    return link;
  }

  async updateTitleLink(id: any, data: any){
    const databases = new Databases(client);

    const titleLink = await databases.updateDocument(
      environment.databaseId,
      environment.collectionIdTitleLink,
      id,
      {
        name: data.name,
      }
    );

    return titleLink;
  }

  async getFooter(){
    const databases = new Databases(client);

    const footer = await databases.listDocuments(
      environment.databaseId,
      environment.collectionIdFooter
    );

    return footer.documents;

  }

  async changeFooterText(id: any, attribut: any, value: any){
    const databases = new Databases(client);

    const footer = await databases.updateDocument(
      environment.databaseId,
      environment.collectionIdFooter,
      id,
      {
        attribut: value
      }
    );

    return footer;
  }
}
