import { Client, Account} from 'appwrite';
import { environment } from 'src/environments/environment';

export const client = new Client();

client
    .setEndpoint(environment.endpoint)
    .setProject(environment.projectId); // Replace with your project ID

export const account = new Account(client);
export { ID } from 'appwrite';