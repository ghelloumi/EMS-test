const URI = process.env.REACT_APP_URI

export class AppService {
    public async fetchProjects(): Promise<any> {
        try {
            const response = await fetch(`${URI}projects`);

            if (response.status !== 200) {
                throw new Error('error')
            }
            return response.json();
        } catch (error) {
            return error
        }
    }
}
