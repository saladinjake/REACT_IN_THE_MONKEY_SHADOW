import { Injectable } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class AppService {
  getHello(res: Response): void {
    const html = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" /><meta http-equiv="X-UA-Compatible" content="IE=edge" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><title>EXP E-Commerce API</title><style>*,*::after,*::before {font-family: 'Helvetica', 'Roboto', sans-serif;}body {margin: 0 auto;max-width: 800px;padding: 2rem;line-height: 1;display: flex;flex-direction: column;grid-gap: 5vh;color: #000;}p {line-height: 1.5;}a {margin-right: 1rem;text-decoration: none;color: green;}main {display: flex;flex-direction: column;grid-gap: 5vh;}ul {display: flex;flex-direction: row;list-style-type: none;line-height: 1.5;margin: 0;padding: 0;}li {padding: 0;margin: 0;}</style></head><body><header><h1>Welcome to putins-arsenal API</h1><p><b>Author: </b><span><a href="https://github.com/saladinjake">Juwa victor</a></span></p></header><main><article><h2>Description</h2><p>This is an PUTINS ARSENALS API with modern features. This API is fast and secure. It's built with TypeScript, nextjs and MongoDB. This API is  used currently with react.
    <img src="" />

    </ul></section></main><script></script></body></html>`;
    res.send(html);
  }
}
