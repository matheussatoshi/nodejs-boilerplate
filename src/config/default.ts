type ConfigProperty = {
  port: number;
};

type ConfigValue = ConfigProperty[keyof ConfigProperty];

class Config {
  private settings: ConfigProperty;

  constructor() {
    this.settings = {
      port: 8080,
    };
  }

  get(key: keyof ConfigProperty): ConfigValue {
    return this.settings[key];
  }

  set(key: keyof ConfigProperty, value: ConfigValue): void {
    this.settings[key] = value;
  }
}

const config = new Config();

export default config;
