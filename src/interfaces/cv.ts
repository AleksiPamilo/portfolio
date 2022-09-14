export declare interface IJob {
    key: string,
    company: string,
    companyWebsite?: string | null,
    desc: string,
    title: string,
    startDate: string,
    endDate: string,
};

export declare interface ISchool {
    key: string,
    name: string,
    desc: string,
    startDate: string,
    endDate: string,
};

export declare interface ISkill {
    index: number,
    language: string,
    percentage: number,
};