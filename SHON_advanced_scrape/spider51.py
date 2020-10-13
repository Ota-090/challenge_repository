# 防止ssl错误
import ssl
ssl._create_default_https_context = ssl._create_unverified_context

import urllib.request as ur
import re
import json
import lxml.etree as le
import tool
import pymongo

def parse1(keyword,page):
    url = 'https://search.51job.com/list/010000,000000,0000,00,9,99,{keyword},2,{page}.html?lang=c&postchannel=0000&workyear=99&cotype=99&degreefrom=99&jobterm=99&companysize=99&ord_field=0&dibiaoid=0&line=&welfare='.format(
        keyword=keyword,
        page=page
    )
    req = ur.Request(
        url=url,
        headers={
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36',
        }
    )

    content = ur.urlopen(req).read().decode('gbk', 'ignore')
    data = json.loads(
        re.findall('window.__SEARCH_RESULT__ = (.*?)</script>', content)[0]
    )
    results = data['engine_search_result']
    return results



def parse2(url):
    req = ur.Request(
        url=url,
        headers={
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36',
        }
    )

    contentb = ur.urlopen(req).read()
    contentx = le.HTML(contentb)
    parse2_job_detail = tool.xpath_union(contentx=contentx, path='//div[@class="tCompany_main"]/div[@class="tBorderTop_box"][1]//text()', split='', default=None)
    parse2_job_conn = tool.xpath_union(contentx=contentx, path='//div[@class="tCompany_main"]/div[@class="tBorderTop_box"][2]//text()', split='', default=None)
    parse2_job_company = tool.xpath_union(contentx=contentx, path='//div[@class="tCompany_main"]/div[@class="tBorderTop_box"][2]//text()', split='', default=None)
    return dict(
        parse2_job_detail=parse2_job_detail,
        parse2_job_conn=parse2_job_conn,
        parse2_job_company=parse2_job_company,
    )

def spider(keyword,c,start_page=1,end_page=100):
    for page in range(start_page,end_page+1):
        parse1_datas = parse1(keyword=keyword, page=page)
        for parse1_data in parse1_datas:
            job_href = parse1_data['job_href']
            parse2_data = parse2(url=job_href)
            parse1_data['parse2_job_detail'] = parse2_data['parse2_job_detail']
            parse1_data['parse2_job_conn'] = parse2_data['parse2_job_conn']
            parse1_data['parse2_job_company'] = parse2_data['parse2_job_company']
            c.insert_one(parse1_data)




if __name__ == '__main__':
    client = pymongo.MongoClient()
    db = client.get_database('db001') # db = client.db001
    c = db.get_collection('51job') # c = db.51job

    spider(keyword='python',c=c,start_page=1,end_page=10)
    spider(keyword='java', c=c, start_page=1, end_page=10)

