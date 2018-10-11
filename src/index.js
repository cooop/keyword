const puppeteer = require('puppeteer');

const maxTimes = 5;

async function click() {
  const browser = await puppeteer.launch({
//     headless: false,
  });
  const page = await browser.newPage();

  // await page.goto(`https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=0&rsv_idx=1&tn=baidu&wd=%E5%B0%8F%E7%A8%8B%E5%BA%8F%20%E6%9D%AD%E5%B7%9E%20%E5%AE%A2%E6%BB%A1&rsv_pq=c19a7a7e00014999&rsv_t=f9d7A1SbJ96qQBi%2BSNptcuDIsrzgNUzgFauWS27XHAcHYq9EzmiIHOoaz7Q&rqlang=cn&rsv_enter=1&rsv_sug3=16&rsv_sug1=18&rsv_sug7=101`);

  await page.goto(`https://www.baidu.com`);

  await page.type('#kw', '小程序 杭州 客满');

  await Promise.all([
    page.waitForNavigation({waitUntil: 'networkidle0'}),
    page.click('#su'),
  ]);

  await page.evaluate(() => {
    const links = document.querySelectorAll('a');
    for(link of links) {
      if (link.innerHTML === 
          `<em>客满</em>-<em>小程序</em>加盟|微信<em>小程序</em>开发|专业的微信<em>小程序</em>制作平台`) {
          link.click();
          return 'click success';
      }
    }
    return 'click failed';
  }).then((message) => {
    console.log(message);
    browser.close();
  })
}

async function clickTimes(times) {
  if (times < 0) {
    let i = 0;
    while(1) {
      console.log('try click for ' + (i + 1) + ' times');
      await click();
      i++;
    }
  } else {
    for (let i = 0; i < times; i ++) {
      console.log('try click for ' + (i + 1) + ' times');
      await click();
    }
  }
}

clickTimes(maxTimes);
