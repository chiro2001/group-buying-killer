import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { orange, grey, blueGrey } from '@material-ui/core/colors';
import { API, AuthAPI } from "./api/api";

class Config {
  ITEM_NAME = "group_bying_config";
  constructor() {
    this.load = this.load.bind(this);
    this.save = this.save.bind(this);
    this.theme_avaliable = {
      "default": createMuiTheme({}),
      dark: createMuiTheme({
        palette: {
          type: "dark",
          primary: {
            main: blueGrey[500],
          },
          secondary: {
            main: grey[500],
          },
        },
      }),
    }
    // 在构造函数执行的时候加载保存的数据
    this.data_default = {
      debug: true,
      version_frontend: 0.1,
      // 显示主题
      theme_name: "dark",
      theme_avaliable: [
        'default',
        'dark'
      ],
      auth: "",
    };
    this.data = this.data_default;
    this.theme = this.theme_avaliable["default"];
    this.api = new API();
    // 先声明已经登录，然后再检查登录状态
    this.has_login = true;
    this.api.has_login().then(state => { this.has_login = state; });
    this.userData = null;
    this.load();
  }

  load() {
    console.log("Config: loading config...");
    if (this.data.debug) {
      console.log("Config: load default config.");
      this.save();
    }
    try {
      this.data = JSON.parse(localStorage.getItem(this.ITEM_NAME));
      if (!this.data) throw new Error("Null data");
      console.log("Got data:", this.data);
      if (!this.data.version_frontend || this.data.version_frontend < this.data_default.version_frontend) {
        // 版本升级，增量更新
        console.log(`Config: update ${this.data.version_frontend} -> ${this.data_default.version_frontend}`);
        this.data.version_frontend = this.data_default.version_frontend;
        for (let k in this.data_default) {
          if (!this.data[k]) {
            console.log(`    Config: add value ${k}`);
            this.data[k] = this.data_default[k];
          }
        }
        this.save();
      }
    } catch (e) {
      console.warn(`Can not find ${this.ITEM_NAME} in localStorage, use default config.`);
      this.data = this.data_default;
      this.save();
    }
    this.theme = this.theme_avaliable[this.data.theme_name];
    if (!this.theme) this.theme = this.theme_avaliable["default"];
  }

  save() {
    console.log("Config: saving config...");
    localStorage.setItem(this.ITEM_NAME, JSON.stringify(this.data));
  }
};

export default Config;