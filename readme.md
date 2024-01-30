## Documentation

<table>
<thead>
<th>Function</th>
<th>Values</th>
<th>data</th>
<tbody>
<tr>
<td>

```
const scraper = new MenRank();
await scraper.initialize("all-rounder");
await scraper.scrape();
```

</td>

 <td>all-rounder , bowling , batting</td>
 <td>
 returns top 99  ranked  men players in Test , ODI , t20.
 </td>
 </tr>
 <tr>
 <td>

```
const scraper = new MenRank();
await scraper.initialize("all-rounder");
await scraper.scrape();

```

 </td>

 <td>all-rounder , bowling , batting</td>
 <td>
 returns top 99  ranked  women players in Test , ODI , t20.
 </td>
 </tr>

<tr>
 <td>

```
const scraper = new TeamRank();
await scraper.initialize("men");
await scraper.scrape();

```

 </td>

 <td>men , women</td>
 <td>
 returns team ranks in Test , ODI , t20
 </td>
 </tr>

<tr>
 <td>

```
const scraper = new News();
await scraper.initialize();
await scraper.scrape();

```

 </td>

 <td>Null</td>
 <td>
 returns latest news in cricket
 </td>
 </tr>

 <tr>
 <td>

```
const scraper = new News();
await scraper.initialize();
await scraper.scrape();

```

 </td>

 <td>Null</td>
 <td>
 returns latest news in cricket
 </td>
 </tr>
 
<tr>
 <td>

```
const scraper = new Player("pandya");
await scraper.scrape()
//returns a playerID

```

 </td>

 <td>any  name</td>
 <td>
 returns player ID
 </td>
 </tr>
 <tr>
 <td>

```
const scraper = new Player("hardik");
await scraper.scrapeProfile(ID);

```

 </td>

 <td>player ID</td>
 <td>
 returns player information and stats in ODI , t20 and test 
 </td>
 </tr>

 <tr>
 <td>

```
Matches().getHTML(MATCHES_URL)

```

 </td>

 <td>MATCHES_URL is defined,so no need </td>
 <td>
 returns live/recent match IDs 
 </td>
 </tr>

 <tr>
 <td>

```
Commentary().getScore(88172)

```

 </td>

 <td>Match ID</td>
 <td>
 returns live/recent match score 
 </td>
 </tr>
</tbody>
</thead>
</table>
