import Headshot from './Headshot'

export default interface Employee {
    id: string;
    bio: string;
    firstName: string;
    lastName: string;
    jobTitle: string;
    slug: string;
    type: string;
    headshot: Headshot;
}