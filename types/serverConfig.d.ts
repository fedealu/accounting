export declare namespace Server {
	export interface IServerConfig {
		port: number;
		apiPrefix: string;
		controllers: any[];
		middlewares: any[];
	}
}
