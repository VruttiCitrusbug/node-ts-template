declare module 'config' {
  interface IConfig {
    app: {
      port: number;
    };
    db: {
      host: string;
      port: number;
    };
    logger: {
      level: string;
    };
  }

  const config: IConfig;
  export default config;
}