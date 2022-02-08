const puppeteer = require('puppeteer'); // Require the Package we need...
const express = require('express');
const app = express();
const port = 3000;

app.get('/google', (req, res) => {

    // Access the provided 'page' and 'limt' query parameters
    let url = req.query.url;

    let scrape = async () => { // Prepare scrape...


        const browser = await puppeteer.launch({
            // headless: false, //enable only when on localServer 
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-accelerated-2d-canvas',
                '--no-first-run',
                '--no-zygote',
                '--single-process', // <- this one doesn't works in Windows
                '--disable-gpu'
            ],
        }); // Prevent non-needed issues for *NIX
        const page = await browser.newPage(); // Create request for the new page to obtain...
        await page.setViewport({
            width: 2000,
            height: 1000,
        });

        // Replace with your Google Maps URL... Or Test the Microsoft one...
        //await page.goto('https://www.google.com/maps/place/Microsoft/@36.1275216,-115.1728651,17z/data=!3m1!5s0x80c8c416a26be787:0x4392ab27a0ae83e0!4m7!3m6!1s0x80c8c4141f4642c5:0x764c3f951cfc6355!8m2!3d36.1275216!4d-115.1706764!9m1!1b1');

        const response = await page.goto(url, {
            waitUntil: 'networkidle2',
            timeout: 0
        }); // Define the Maps URL to Scrape...

        console.log('waiting for selector');
        await page.waitFor(2000);
        try {

            var relatedKeywordsGoogle = await page.$$eval("a.k8XOCe.R0xfCb.VCOFK.s8bAkb",
                elements => elements.map(item => item.textContent))
            //console.log(relatedKeywordsGoogle)

            var resultTitleGoogle = await page.$$eval("div.NJo7tc.Z26q7c.jGGQ5e > div.yuRUbf > a > h3.LC20lb.MBeuO.DKV0Md",
                elements => elements.map(item => item.textContent))
            //console.log(resultTitleGoogle)

            var resultDescriptionGoogle = await page.$$eval("div.NJo7tc.Z26q7c.uUuwM",
                elements => elements.map(item => item.textContent))
            //console.log(resultDescriptionGoogle)

            var resultUrlGoogle = await page.$$eval("div.NJo7tc.Z26q7c.jGGQ5e > div.yuRUbf > a",
                elements => elements.map(item => item.getAttribute("href")))
            //console.log(resultUrlGoogle)

            var richSnippetGoogle = await page.$$eval("div.V3FYCf > div.wDYxhc ",
                elements => elements.map(item => item.innerHTML))
            //console.log(resultUrlGoogle)


            const selectors = await page.$$('.iDjcJe.IX9Lgd.wwB5gf')

            try {
                for (var i = 1; i < selectors.length; i++) {
                    await page.waitFor(1000);
                    await selectors[i].click()
                }
            } catch (error) {
                console.log('Faq found for click')
            }

            // await page.waitForSelector('div.iDjcJe.IX9Lgd.wwB5gf span')
            await page.waitFor(3000);

            var linkTextsQuestions = await page.$$eval("div.iDjcJe.IX9Lgd.wwB5gf span",
                elements => elements.map(item => item.textContent))

            var linkTextsAnswers = await page.$$eval("div.MBtdbb",
                elements => elements.map(item => item.textContent))

            var finalResult = {
                'status': 'success',
                'questions': linkTextsQuestions,
                'answers': linkTextsAnswers,
                'richSnippetGoogle': richSnippetGoogle,
                'resultTitleGoogle': resultTitleGoogle,
                'resultDescriptionGoogle': resultDescriptionGoogle,
                'resultUrlGoogle': resultUrlGoogle,
                'relatedKeywordsGoogle': relatedKeywordsGoogle
            }


            return finalResult;
        } catch (err) {
            console.error(err);
            var finalResult = {
                'status': 'fail',
                'richSnippet': richSnippet,

            }
            return finalResult;
            process.exit(1);
        } finally {
            await page.close();
            await browser.close();
        }
    };

    scrape().then((value) => { // Scrape and output the results...
        res.send(value); // Yay, output the Results...
    });
})





app.get('/bing', (req, res) => {

    // Access the provided 'page' and 'limt' query parameters
    let url = req.query.url;

    let scrape = async () => { // Prepare scrape...


        const browser = await puppeteer.launch({

            //headless: false, //enable only when on localServer

            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-accelerated-2d-canvas',
                '--no-first-run',
                '--no-zygote',
                '--single-process', // <- this one doesn't works in Windows
                '--disable-gpu'
            ],
        }); // Prevent non-needed issues for *NIX
        const page = await browser.newPage(); // Create request for the new page to obtain...
        await page.setViewport({
            width: 2000,
            height: 1000,
        });
        // Replace with your Google Maps URL... Or Test the Microsoft one...
        //await page.goto('https://www.google.com/maps/place/Microsoft/@36.1275216,-115.1728651,17z/data=!3m1!5s0x80c8c416a26be787:0x4392ab27a0ae83e0!4m7!3m6!1s0x80c8c4141f4642c5:0x764c3f951cfc6355!8m2!3d36.1275216!4d-115.1706764!9m1!1b1');

        const response = await page.goto(url, {
            waitUntil: 'networkidle2',
            timeout: 0
        }); // Define the Maps URL to Scrape...

        console.log('waiting for selector');
        await page.waitFor(3000);
        try {

            var resultTitle = await page.$$eval("div.b_title > h2",
                elements => elements.map(item => item.textContent))
            //console.log(resultTitle)

            var resultDescription = await page.$$eval("div.b_caption > p",
                elements => elements.map(item => item.textContent))
            //console.log(resultDescription)

            var resultUrl = await page.$$eval("div.b_title > h2 > a",
                elements => elements.map(item => item.getAttribute("href")))
            //console.log(resultUrl)

            var relatedKeywords = await page.$$eval("div.b_rs > ul.b_vList.b_divsec > li",
                elements => elements.map(item => item.textContent))
            //console.log(relatedKeywords)

            var mainQuestions = await page.$$eval("div.b_expansion_wrapper.b_expand.b_divsec.b_onpage_expansion",
                elements => elements.map(item => item.textContent))
            //console.log(mainQuestions)

            var mainAnswers = await page.$$eval("div.rwrl.rwrl_small.rwrl_padref",
                elements => elements.map(item => item.innerHTML))
            //console.log(mainAnswers)

            var richSnippet = await page.$$eval("div.rwrl.rwrl_pri.rwrl_padref",
                elements => elements.map(item => item.innerHTML))
            //console.log(richSnippet)

            var richSnippetLink = await page.$$eval("div.b_algo > h2 > a",
                elements => elements.map(item => item.getAttribute("href")))
            //console.log(richSnippetLink)

            var tabNav = await page.$$eval("div.tab-menu.tab-hasnav > ul > li",
                elements => elements.map(item => item.innerHTML))
            //console.log(tabNav)

            var tabContent = await page.$$eval("div.tab-content > div",
                elements => elements.map(item => item.innerHTML))
            //console.log(tabNav)

            var slideQuestions = await page.$$eval("div.b_insideSlide > div.b_title",
                elements => elements.map(item => item.textContent))
            //console.log(tabNav)

            var slideAnswers = await page.$$eval("div.b_insideSlide > div.b_text",
                elements => elements.map(item => item.textContent))
            //console.log(tabNav)


            var finalResult = {
                'status': 'success',
                'resultTitle': resultTitle,
                'resultDescription': resultDescription,
                'resultUrl': resultUrl,
                'mainQuestions': mainQuestions,
                'mainAnswers': mainAnswers,
                'richSnippet': richSnippet,
                'richSnippetLink': richSnippetLink,
                'slideQuestions': slideQuestions,
                'slideAnswers': slideAnswers,
                'relatedKeywords': relatedKeywords,

            }

            const selectors = await page.$$('.scs_icn')
            try {
                for (var i = 1; i < selectors.length; i++) {
                    console.log(i)
                    await selectors[i].click()
                    await page.waitFor(1000);
                }
            } catch (error) {
                console.log('no icon found for click')
            }

            var popQuestions = await page.$$eval("div.scs_faAc > div.b_vPanel > div > div.b_module_expansion_control.b_module_head > div.b_module_expansion > div.b_expansion_wrapper.b_collapse.b_onpage_expansion",
                elements => elements.map(item => item.textContent))
            //console.log(popQuestions)
            var popAnswers = await page.$$eval("div.rwrl.rwrl_small.rwrl_resetFont",
                elements => elements.map(item => item.innerHTML))
            //console.log(popAnswers)

            finalResult.popQuestions = popQuestions
            finalResult.popAnswers = popAnswers

            const selectorsNav = await page.$$('div.tab-menu.tab-hasnav > ul > li')
            try {
                for (var i = 1; i < selectorsNav.length; i++) {
                    console.log(i)
                    await selectorsNav[i].click()
                    await page.waitFor(1000);
                }
            } catch (error) {
                console.log('no NavBar found for click')
            }

            var tabNav = await page.$$eval("div.tab-menu.tab-hasnav > ul > li",
                elements => elements.map(item => item.innerHTML))
            //console.log(tabNav)

            var tabContent = await page.$$eval("div.tab-content > div",
                elements => elements.map(item => item.innerHTML))
            //console.log(tabNav)

            finalResult.tabNav = tabNav
            finalResult.tabContent = tabContent

            return finalResult;

        } catch (err) {
            console.error(err);
            return finalResult;
            process.exit(1);
        } finally {
            await page.close();
            await browser.close();
        }
    };

    scrape().then((value) => { // Scrape and output the results...
        res.send(value); // Yay, output the Results...
    });
})




app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})