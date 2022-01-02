import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { XMLParser } from 'fast-xml-parser';
import { RssSource } from './rss-source.interface';
import { RssParseResult } from './rss-parse-result.interface';

@Injectable()
export class ArticleRssParserService {
  private axiosInstance: AxiosInstance;
  private xmlParser: XMLParser;

  constructor() {
    this.axiosInstance = axios.create();
    this.xmlParser = new XMLParser();
  }

  async parseSource(source: RssSource): Promise<RssParseResult> {
    const response = await this.axiosInstance.get(source.sourceUrl);
    const xml = response.data;
    const jObj = this.xmlParser.parse(xml);
    if (!jObj?.rss?.channel) {
      throw new Error('Invalid RSS feed');
    }
    if (!jObj.rss?.channel?.item) {
      throw new Error("Rss feed doesn't contain any items");
    }
    return {
      channel: jObj.rss.channel,
      sourceUrl: source.sourceUrl,
    };
  }
}
