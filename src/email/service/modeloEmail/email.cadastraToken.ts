import { CompaniesEntity } from "src/companies/entity/company.entity";

export const modelo_email_cadastrar_token = (
  user: CompaniesEntity,
  token: string,
) => {
  const url = `${process.env.URL_BACKEND}/auth/altera-senha?mail=${user.mail}&token=${token}`;
  return `
    <html>
    <body>
    <br>
    <p align="center">
    <img src="https://i.postimg.cc/T3Z0ws6s/logo.jpg" alt="Descrição da imagem" width="250px">
    </p>
    <br>
    <br>
    <h2>Olá ${user.name},</h2>
    <p>Olá. Clique neste link para receber um email com a sua nova senha.</p>
    <p>
    <a href="${url}" target:"_blank">Clique aqui para enviar</a>
    </p>
    <br>
    <p>Em breve você receberá outro e-mail com sua senha temporária.</p>
    <p>Caso não tenha solicitado, ignore este email.</p>
    <br>
    <h2 align="center">Farm Metrics</h2>
    <h3 align="center">Cultivando conexões</h3>
    </body>
    </html>`;
};
