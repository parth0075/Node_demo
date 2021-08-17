 import * as nodeMailer from 'nodemailer';
 import * as SendGrid from 'nodemailer-sendgrid-transport';

export class NodeMailer{

private static initializeTransport(){
    return nodeMailer.createTransport(SendGrid({
        auth:{
            api_key:'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'
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