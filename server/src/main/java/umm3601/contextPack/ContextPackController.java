package umm3601.contextPack;

import static com.mongodb.client.model.Filters.and;
import static com.mongodb.client.model.Filters.eq;
import static com.mongodb.client.model.Filters.regex;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;

import com.google.common.collect.ImmutableMap;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Sorts;

import org.bson.Document;
import org.bson.conversions.Bson;
import org.bson.types.ObjectId;
import org.mongojack.JacksonMongoCollection;

import io.javalin.http.BadRequestResponse;
import io.javalin.http.Context;
import io.javalin.http.NotFoundResponse;

/**
 * Controller that manages requests for info about users.
 */
public class ContextPackController {

  private static final String NAME_KEY = "name";
  //private static final String ICON_KEY = "icon";
  private static final String ENABLED_KEY = "enabled";
  //private static final String WORDLISTS_KEY = "wordlists";


  private final JacksonMongoCollection<ContextPack> contextPackCollection;

  /**
   * Construct a controller for users.
   *
   * @param database the database containing user data
   */
  public ContextPackController(MongoDatabase database) {
    contextPackCollection = JacksonMongoCollection.builder().build(database, "ctxPks", ContextPack.class);
  }

  /**
   * Get the single user specified by the `id` parameter in the request.
   *
   * @param ctx a Javalin HTTP context
   */
  public void getContextPack(Context ctx) {
    String id = ctx.pathParam("id");
    ContextPack contextPack;

    try {
      contextPack = contextPackCollection.find(eq("_id", new ObjectId(id))).first();
    } catch(IllegalArgumentException e) {
      throw new BadRequestResponse("The requested user id wasn't a legal Mongo Object ID.");
    }
    if (contextPack == null) {
      throw new NotFoundResponse("The requested context pack was not found");
    } else {
      ctx.json(contextPack);
    }
  }


  /**
   * Delete the user specified by the `id` parameter in the request.
   *
   * @param ctx a Javalin HTTP context
   */
  /*
  public void deleteUser(Context ctx) {
    String id = ctx.pathParam("id");
    userCollection.deleteOne(eq("_id", new ObjectId(id)));
  }
  */

  /**
   * Get a JSON response with a list of all the users.
   *
   * @param ctx a Javalin HTTP context
   */
  public void getContextPacks(Context ctx) {

    List<Bson> filters = new ArrayList<>(); // start with a blank document


    if (ctx.queryParamMap().containsKey(NAME_KEY)) {
      filters.add(regex(NAME_KEY,  Pattern.quote(ctx.queryParam(NAME_KEY)), "i"));
    }

    if (ctx.queryParamMap().containsKey(ENABLED_KEY)) {
      boolean targetEnabled = ctx.queryParam(ENABLED_KEY, Boolean.class).get();
      filters.add(eq(ENABLED_KEY, targetEnabled));
    }

    String sortBy = ctx.queryParam("sortby", "name"); //Sort by sort query param, default is name
    String sortOrder = ctx.queryParam("sortorder", "asc");


    ctx.json(contextPackCollection.find(filters.isEmpty() ? new Document() : and(filters))
      .sort(sortOrder.equals("desc") ?  Sorts.descending(sortBy) : Sorts.ascending(sortBy))
      .into(new ArrayList<>()));
  }

  /*
   * Get a JSON response with a list of all the users.
   *
   * @param ctx a Javalin HTTP context
   */
  /*
  public void addNewUser(Context ctx) {
    User newUser = ctx.bodyValidator(User.class)
      .check(usr -> usr.name != null && usr.name.length() > 0) //Verify that the user has a name that is not blank
      .check(usr -> usr.email.matches(emailRegex)) // Verify that the provided email is a valid email
      .check(usr -> usr.age > 0) // Verify that the provided age is > 0
      .check(usr -> usr.role.matches("^(admin|editor|viewer)$")) // Verify that the role is one of the valid roles
      .check(usr -> usr.company != null && usr.company.length() > 0) // Verify that the user has a company that is not blank
      .get();

    contextPackCollection.insertOne(newWordList);
    ctx.status(201);
    ctx.json(ImmutableMap.of("wordlists", newWordList.wordlists));
  }

  /**
   * Get a JSON response with a list of all the users.
   *
   * @param ctx a Javalin HTTP context
   */

  public void addNewContextPack(Context ctx) {
    ContextPack newContextPack = ctx.bodyValidator(ContextPack.class)
      .check(usr -> usr.name != null && usr.name.length() > 0) //Verify that the user has a name that is not blank
      .check(usr -> usr.enabled || !usr.enabled) // Verify that the provided email is a valid email
      .get();

    contextPackCollection.insertOne(newContextPack);
    ctx.status(201);
    ctx.json(ImmutableMap.of("id", newCtxPk._id));
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
