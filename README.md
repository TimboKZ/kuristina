# Kuristina

Kuristina is here to assist you in fetching list contents for both manga and anime lists from MyAnimeList. This page contains all of the documentation you need to use it, but if you want to find out more about how it was developed refer to [this article](https://foxypanda.me/my-anime-timeline-and-kuristina/).

# Features

At the moment, Kuristina only has 2 features:

* Fetching anime list by username, printing the result in either XML or JSON.
* Fetching manga list by username, printing the result in either XML or JSON.

This list is most likely to expand over time, so you might wanna check this page once in a while if you're interested.

# Usage

At the moment Kuristina only accepts GET request of the following format:

```
https://kuristina.herokuapp.com/<LIST-TYPE>/<USERNAME>.<FORMAT>
```

Where `<LIST-TYPE>` is either `anime` or `manga` to fetch anime or manga list respectively, `<USERNAME>` is the name of the user whose list you want to fetch and finally `<FORMAT>` is the format in which the list will be returned, either `xml` or `json`. All of the 3 parameters are case-insensitive. Consider the examples below

> Note: At the moment JSON and XML results do not provide identical information. Consult the Example Responses section below.

```
# Fetch Timbo_KZ's manga list in XML
GET https://kuristina.herokuapp.com/manga/Timbo_KZ.xml

# Fetch Timbo_KZ's anime list in JSON
GET https://kuristina.herokuapp.com/anime/Timbo_KZ.json
```

# Possible errors

Here are several possible cases which might have to handle in your applcaition:

* If you access any other URL but the index or the URLs of format specified above, Kuristina will return `404 Not Found` status code.
* If the list type is not supported, username does not appear to be valid (i.e. MAL user names can only contain letters, numbers, dashes and underscores) or format specified is not supported Kuristina will return `400 Bad Request` status code.
* If you request the list in JSON format and the username you specified does not exist, server will return a `500 Internal Server Error` status code.
* If you request the list in XML format and the username you specified does not exist, server will return a the list as usual with the following contents:
```xml
<myanimelist>
    <error>Invalid username</error>
</myanimelist>
```
* If any other error occurs during fetching, server will return `500 Internal Server Error` status code.

# Example responses

Anime list in XML:

```xml
<myanimelist>
    <myinfo>
        <user_id>4718042</user_id>
        <user_name>Timbo_KZ</user_name>
        <user_watching>57</user_watching>
        <user_completed>125</user_completed>
        <user_onhold>1</user_onhold>
        <user_dropped>1</user_dropped>
        <user_plantowatch>31</user_plantowatch>
        <user_days_spent_watching>43.86</user_days_spent_watching>
    </myinfo>
    <anime>
        <series_animedb_id>1</series_animedb_id>
        <series_title>Cowboy Bebop</series_title>
        <series_synonyms>COWBOY BEBOP; Cowboy Bebop</series_synonyms>
        <series_type>1</series_type>
        <series_episodes>26</series_episodes>
        <series_status>2</series_status>
        <series_start>1998-04-03</series_start>
        <series_end>1999-04-24</series_end>
        <series_image>
        https://myanimelist.cdn-dena.com/images/anime/4/19644.jpg
        </series_image>
        <my_id>0</my_id>
        <my_watched_episodes>26</my_watched_episodes>
        <my_start_date>2016-02-15</my_start_date>
        <my_finish_date>2016-04-02</my_finish_date>
        <my_score>8</my_score>
        <my_status>2</my_status>
        <my_rewatching>0</my_rewatching>
        <my_rewatching_ep>0</my_rewatching_ep>
        <my_last_updated>1459548352</my_last_updated>
        <my_tags/>
    </anime>
</myanimelist>
```

Anime list in JSON:

```
[  
   {  
      "status":1,
      "score":0,
      "tags":"",
      "is_rewatching":0,
      "num_watched_episodes":0,
      "anime_title":"Angel Beats!",
      "anime_num_episodes":13,
      "anime_airing_status":2,
      "anime_id":6547,
      "anime_studios":null,
      "anime_licensors":null,
      "anime_season":null,
      "has_episode_video":true,
      "has_promotion_video":true,
      "has_video":true,
      "video_url":"\/anime\/6547\/Angel_Beats\/video",
      "anime_url":"\/anime\/6547\/Angel_Beats",
      "anime_image_path":"https:\/\/myanimelist.cdn-dena.com\/r\/96x136\/images\/anime\/10\/22061.jpg?s=fc02fa92ed45c521101c25e2de51fdac",
      "is_added_to_list":false,
      "anime_media_type_string":"TV",
      "anime_mpaa_rating_string":"PG-13",
      "start_date_string":null,
      "finish_date_string":null,
      "anime_start_date_string":"03-04-10",
      "anime_end_date_string":"26-06-10",
      "days_string":null,
      "storage_string":"",
      "priority_string":"Low"
   }
]
```

Manga list in XML:

```
```

Manga list in JSON:

```
```