#!/usr/bin/env python
# coding: utf-8

# In[1]:


import requests
import pandas as pd
from splinter import Browser
from bs4 import BeautifulSoup as bs
import time


def init_browser():
    executable_path = {'executable_path': 'chromedriver.exe'}
    return Browser('chrome', **executable_path, headless=False)

def scrape():
    browser = init_browser()
    mars_dict = {}


    # ### NASA Mars News
    url_1 = 'https://mars.nasa.gov/news/'
    browser.visit(url_1)
    time.sleep(2)
    html = browser.html
    soup = bs(html, 'html.parser')
    print("*"*6)
    print(type(soup))
    mars_dict["title"] = soup.find('ul', class_='item_list').find('li', class_='slide').find('div', class_='content_title').find('a').get_text()
    mars_dict["paragraph"] = soup.find('ul', class_='item_list').find('li', class_='slide').find('div', class_='article_teaser_body').get_text()

    print("*"*12)
    print(mars_dict["title"])

    # ### JPL Mars Space Images - Featured Image

    # In[7]:
    time.sleep(3)
    url_2 = 'https://www.jpl.nasa.gov/spaceimages/?search=&category=Mars'
    browser.visit(url_2)
    browser.find_by_css('div[class="default floating_text_area ms-layer"]').find_by_css('footer').find_by_css('a[class="button fancybox"]').click()
    browser.find_by_css('div[id="fancybox-lock"]').find_by_css('div[class="buttons"]').find_by_css('a[class="button"]').click()
    mars_dict["f_img_url"] = browser.find_by_css('div[id="page"]').find_by_css('section[class="content_page module"]').find_by_css('figure[class="lede"]').find_by_css('a')['href']

    time.sleep(3)
    print("*"*12)
    print(mars_dict["f_img_url"])
    # ### Mars Weather

    url_3 = 'https://twitter.com/marswxreport?lang=en'
    browser.visit(url_3)
    time.sleep(5)
    html = browser.html
    soup = bs(html, 'html.parser')
    print("*"*6)
    print(type(soup))

    mars_dict["mars_weather"] = soup.find('div', class_= 'css-901oao r-hkyrab r-1qd0xha r-a023e6 r-16dba41 r-ad9z0x r-bcqeeo r-bnwqim r-qvutc0').find('span', class_='css-901oao css-16my406 r-1qd0xha r-ad9z0x r-bcqeeo r-qvutc0').get_text()

    print("*"*12)
    print(mars_dict["mars_weather"])
    # ### Mars Facts
    url_4 = 'https://space-facts.com/mars/'
    tables = pd.read_html(url_4)
    mars_df = tables[0]
    mars_df.columns = ['Description', 'FACT']
    mars_df.set_index('Description', inplace = True)
    mars_df.index.name=None
    mars_dict["mars_table"] = mars_df.to_html()


    # ###  Mars Hemispheres
    url_5 = 'https://astrogeology.usgs.gov/search/results?q=hemisphere+enhanced&k1=target&v1=Mars'
    browser.visit(url_5)
    time.sleep(3)
    html = browser.html
    soup = bs(html, 'html.parser')
    print("*"*6)
    print(type(soup))
    hemispheres = soup.find('div', class_='collapsible results').find_all('div', class_='item')

    hemisphere_dict = []
    for x in range(len(hemispheres)):
        caption = hemispheres[x].find('div', class_="description").find('h3').text
        browser.find_by_css('div[class="collapsible results"]').find_by_css('div[class="item"]')[x].find_by_css('div[class="description"]').find_by_css('a').click()

        for img in browser.find_by_css('div[class="downloads"]').find_by_css('a'):
            if ('Original' in img.text):
                img_url = img['href']
        browser.back()
        h_dict = {'caption': caption, 'image': img_url}
        hemisphere_dict.append(h_dict)

    mars_dict["hemisphere_dict"] = hemisphere_dict

    print("*"*12)
    print(mars_dict["hemisphere_dict"])

    return mars_dict

    browser.quit()


# scrape()

