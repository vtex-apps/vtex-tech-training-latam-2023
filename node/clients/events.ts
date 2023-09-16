import { SQS } from 'aws-sdk'
import type { IOContext, InstanceOptions } from '@vtex/api'
import { JanusClient } from '@vtex/api'

import {
  VTEX_APP_AWS_ACCESS_KEY_ID,
  VTEX_APP_AWS_SECRET_ACCESS_KEY,
} from '../constants'

const accessKeyId = VTEX_APP_AWS_ACCESS_KEY_ID as string
const secretAccessKey = VTEX_APP_AWS_SECRET_ACCESS_KEY as string

export class SqsClient extends JanusClient {
  private sqs: SQS

  constructor(context: IOContext, options?: InstanceOptions) {
    super(context, {
      ...options,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        ...(options && options.headers),
        ...(context.authToken
          ? { VtexIdclientAutCookie: context.authToken }
          : null),
      },
    })

    this.sqs = new SQS({ region: 'us-east-1', accessKeyId, secretAccessKey })
  }

  public async sendMessage(
    queueUrl: string,
    messageBody: string
  ): Promise<void> {
    console.log('Sending message to SQS...')
    const params = {
      QueueUrl: queueUrl,
      MessageBody: messageBody,
    }

    try {
      const data = await this.sqs.sendMessage(params).promise()

      console.log(`Message sent with ID: ${data.MessageId}`)
    } catch (error) {
      console.error(`An error occurred: ${error}`)
    }
  }
}
