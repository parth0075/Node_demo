 import * as nodeMailer from 'nodemailer';
 import * as SendGrid from 'nodemailer-sendgrid-transport';

export class NodeMailer{

private static initializeTransport(){
    return nodeMailer.createTransport(SendGrid({
        auth:{
        
        }
    }))
  }

  static sendEMail(data:{to:[string],subject:string,html:string}): Promise<any>
    {
  return  NodeMailer.initializeTransport().sendMail({
        to:data.to,
        from:'parth.b@peerbits.com',
        subject:data.subject,
        html:data.html
    })
  }

}
