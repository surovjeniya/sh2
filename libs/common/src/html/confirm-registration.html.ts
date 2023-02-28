export const getConfirmRegistration = (server:string,confirmation_id:string) => {
    return `<h1>Для подтверждения регистрации перейдите по ссылке ниже:</h1>
          <a href=\`${server}/auth/${confirmation_id}\`>Подтвердить регистрацию.</a>  
    `;
}