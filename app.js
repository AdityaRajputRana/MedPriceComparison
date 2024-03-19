import express from 'express';
import * as cheerio from 'cheerio';

const app = express();
const port = 8080;

express.json([]);

app.get('/', (req, res) => {
  res.send('Hello World, I am live');
});

async function get1MgPrice(drugName){
    let url = "https://www.google.com/search?q=" + drugName + "+1mg";
    let googleScrap = await (await fetch(url)).text();
    const $ = cheerio.load(googleScrap);
    let anchors = $('a').toArray();
    let links = anchors.map(anchor => anchor.attribs.href);
    let interestedUrls = links.filter(linkUrl => linkUrl.includes("1mg.com") && linkUrl.includes(drugName.split("+")[0].toLowerCase()));
    if (interestedUrls.length <= 0){
        return {
            provider: "1mg",
            price: -1,
            link: ""
        }
    }
    let drugUrl = interestedUrls[0];
    drugUrl = "http" +  drugUrl.split("http")[1];
    drugUrl = drugUrl.split("&")[0];
    let websiteScrap = await (await fetch(drugUrl)).text();;
    let price = websiteScrap.split("₹")[1].split("MRP")[0].match(/\d+(\.\d+)?/)[0];
    console.log(drugUrl);
    price = Number(price);
    return {
        provider: "1mg",
        price: price || -1,
        link: drugUrl
    }
};

async function getPharmEasyPrice(drugName){
    let url = "https://www.google.com/search?q=" + drugName + "+pharmeasy";
    let googleScrap = await (await fetch(url)).text();
    const $ = cheerio.load(googleScrap);
    let anchors = $('a').toArray();
    let links = anchors.map(anchor => anchor.attribs.href);
    let interestedUrls = links.filter(linkUrl => linkUrl.includes("pharmeasy.in") && linkUrl.includes(drugName.split("+")[0].toLowerCase()));
    if (interestedUrls.length <= 0){
        return {
            provider: "PharmEasy",
            price: -1,
            link: ""
        }
    }
    let drugUrl = interestedUrls[0];
    drugUrl = "http" +  drugUrl.split("http")[1];
    drugUrl = drugUrl.split("&")[0];
    let websiteScrap = await (await fetch(drugUrl)).text();;
    let price = websiteScrap.split("₹")[1].split("MRP")[0].match(/\d+(\.\d+)?/)[0];
    console.log(drugUrl);
    price = Number(price);
    return {
        provider: "PharmEasy",
        price: price || -1,
        link: drugUrl
    }
};
async function getNetMedsPrice(drugName){
    let url = "https://www.google.com/search?q=" + drugName + "+netmeds";
    let googleScrap = await (await fetch(url)).text();
    const $ = cheerio.load(googleScrap);
    let anchors = $('a').toArray();
    let links = anchors.map(anchor => anchor.attribs.href);
    let interestedUrls = links.filter(linkUrl => linkUrl.includes("netmeds.com") && linkUrl.includes(drugName.split("+")[0].toLowerCase()));
    if (interestedUrls.length <= 0){
        return {
            provider: "NetMeds",
            price: -1,
            link: ""
        }
    }
    let drugUrl = interestedUrls[0];
    drugUrl = "http" +  drugUrl.split("http")[1];
    drugUrl = drugUrl.split("&")[0];
    let websiteScrap = await (await fetch(drugUrl)).text();;
    let price = websiteScrap.split("₹")[1].split("MRP")[0].match(/\d+(\.\d+)?/)[0];
    console.log(drugUrl);
    price = Number(price);
    return {
        provider: "NetMeds",
        price: price || -1,
        link: drugUrl
    }
};


app.get('/compare/:drugName', async (req, res)=>{
    let drugName = req.params.drugName;
    let finalRes = [];
    let promiseResult = await Promise.all([
        get1MgPrice(drugName),
        getPharmEasyPrice(drugName),
        getNetMedsPrice(drugName)
    ]);
    res.send(promiseResult);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

