package umm3601.wordList;

import umm3601.contextPack.*;

import static com.mongodb.client.model.Filters.and;
import static com.mongodb.client.model.Filters.eq;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;

//import com.google.common.collect.ImmutableMap;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Sorts;

import org.bson.Document;
import org.bson.conversions.Bson;
//import org.bson.types.ObjectId;
import org.mongojack.JacksonMongoCollection;

//import io.javalin.http.BadRequestResponse;
import io.javalin.http.Context;
//import io.javalin.http.NotFoundResponse;

/**
 * Controller that manages requests for info about wordLists.
 */
public class WordListController {

  private static final String NAME_KEY = "name";
  private static final String ENABLED_KEY = "enabled";

  private final JacksonMongoCollection<WordList> wordListCollection;

  /**
   * Construct a controller for wordLists.
   *
   * @param database the database containing wordList data
   */
  public WordListController(MongoDatabase database) {
    JacksonMongoCollection<ContextPack> contextPackCollection = JacksonMongoCollection.builder().build(database, "ctxPks", ContextPack.class);
    wordListCollection = JacksonMongoCollection.builder().build(database, "wordlists", WordList.class);
    for(ContextPack c: contextPackCollection.find()
    .into(new ArrayList<>())) {
      for(WordList wList: c.wordlists) {
        wordListCollection.insert(wList);
      }
    }
  }

  /**
   * Delete the wordList specified by the `name` parameter in the request.
   *
   * @param ctx a Javalin HTTP context
   *
  public void deleteWordList(Context ctx) {
    String name = ctx.pathParam("name");
    wordListCollection.deleteOne(eq("name", new ObjectId(name)));
  }*/

  public void getWordList(Context ctx) {}

  /**
   * Get a JSON response with a list of all the wordLists.
   *
   * @param ctx a Javalin HTTP context
   */
  public void getWordLists(Context ctx) {

    List<Bson> filters = new ArrayList<>(); // start with a blank document

    if (ctx.queryParamMap().containsKey(NAME_KEY)) {
        filters.add(eq(NAME_KEY, ctx.queryParam(NAME_KEY, String.class).get()));
    }

    if (ctx.queryParamMap().containsKey(ENABLED_KEY)) {
      filters.add(eq(ENABLED_KEY, ctx.queryParam(ENABLED_KEY, Boolean.class).get()));
    }

    String sortBy = ctx.queryParam("sortby", "name"); //Sort by sort query param, default is name
    String sortOrder = ctx.queryParam("sortorder", "asc");

    ctx.json(wordListCollection.find(filters.isEmpty() ? new Document() : and(filters))
      .sort(sortOrder.equals("desc") ?  Sorts.descending(sortBy) : Sorts.ascending(sortBy))
      .into(new ArrayList<>()));
  }

  /**
   * Get a JSON response with a list of all the wordLists.
   *
   * @param ctx a Javalin HTTP context
   */
  public void addNewWordList(Context ctx) {
    WordList newWordList = ctx.bodyValidator(WordList.class)
      .check(usr -> usr.name != null && usr.name.length() > 0) //Verify that the wordList has a name that is not blank
      .check(usr -> usr.enabled || !usr.enabled) // Verify that the provided email is a valid email
      .get();

    wordListCollection.insertOne(newWordList);
    ctx.status(201);
  }

  /**
   * Utility function to generate the md5 hash for a given string
   *
   * @param str the string to generate a md5 for
   */
  @SuppressWarnings("lgtm[java/weak-cryptographic-algorithm]")
  public String md5(String str) throws NoSuchAlgorithmException {
    MessageDigest md = MessageDigest.getInstance("MD5");
    byte[] hashInBytes = md.digest(str.toLowerCase().getBytes(StandardCharsets.UTF_8));

    StringBuilder result = new StringBuilder();
    for (byte b : hashInBytes) {
      result.append(String.format("%02x", b));
    }
    return result.toString();
  }
}
