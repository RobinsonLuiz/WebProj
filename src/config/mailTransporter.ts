import * as nodemailer from 'nodemailer';

export default class mailTransporter {

    private _transporter: nodemailer;

    constructor() {
        this._transporter = nodemailer.createTransport({
            host: 'smtp.googlemail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'ecommerceTemp@gmail.com',
                pass: 'ecommerce123'
            }
        })
    }

    get transporter() {
        return this._transporter;
    }
}