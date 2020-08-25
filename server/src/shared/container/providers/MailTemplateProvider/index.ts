import EtherealMailProvider from "./implementations/EtherealMailProvider";
import SESMailProvider from "./implementations/SESMailProvider";
import { container } from "tsyringe";
import IMailProvider from "./models/IMailProvider";
import mailConfig from "@config/mail";
import IMailTemplateProvider from "./models/IMailTemplateProvider";
import HandlebarsMailTemplateProvider from "./implementations/HandlebarsMailTemplateProvider";

const providers = {
  handlebars: HandlebarsMailTemplateProvider
}


container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  providers.handlebars,
)
