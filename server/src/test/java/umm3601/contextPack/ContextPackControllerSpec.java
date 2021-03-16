package umm3601.contextPack;

import static com.mongodb.client.model.Filters.eq;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.google.common.collect.ImmutableMap;
import com.mockrunner.mock.web.MockHttpServletRequest;
import com.mockrunner.mock.web.MockHttpServletResponse;
import com.mongodb.MongoClientSettings;
import com.mongodb.ServerAddress;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

import org.bson.Document;
import org.bson.types.ObjectId;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import io.javalin.http.BadRequestResponse;
import io.javalin.http.Context;
import io.javalin.http.NotFoundResponse;
import io.javalin.http.util.ContextUtil;
import io.javalin.plugin.json.JavalinJson;


/**
* Tests the logic of the UserController
*
* @throws IOException
*/
public class ContextPackControllerSpec {

  MockHttpServletRequest mockReq = new MockHttpServletRequest();
  MockHttpServletResponse mockRes = new MockHttpServletResponse();

  private ContextPackController ctxPkController;

  private ObjectId jojoId;

  static MongoClient mongoClient;
  static MongoDatabase db;

  static ObjectMapper jsonMapper = new ObjectMapper();

  @BeforeAll
  public static void setupAll() {
    String mongoAddr = System.getenv().getOrDefault("MONGO_ADDR", "localhost");

    mongoClient = MongoClients.create(
    MongoClientSettings.builder()
    .applyToClusterSettings(builder ->
    builder.hosts(Arrays.asList(new ServerAddress(mongoAddr))))
    .build());

    db = mongoClient.getDatabase("test");
  }


  @BeforeEach
  public void setupEach() throws IOException {

    // Reset our mock request and response objects
    mockReq.resetAll();
    mockRes.resetAll();

    // Setup database
    MongoCollection<Document> ctxPkDocuments = db.getCollection("ctxPks");
    ctxPkDocuments.drop();
    List<Document> testCtxPks = new ArrayList<>();
    testCtxPks.add(
      new Document()
        .append("name", "Birthday Pack")
        .append("icon", "birthday.png")
        .append("enabled", true)
        // .append("wordlists", ...)
        );
    testCtxPks.add(
      new Document()
        .append("name", "farm")
        .append("icon", "barn.png")
        .append("enabled", true)
        // .append("wordlists", ...)
        );
    testCtxPks.add(
      new Document()
        .append("name", "sight words")
        .append("icon", "eye.png")
        .append("enabled", false)
        // .append("wordlists", ...)
        );

    jojoId = new ObjectId();
    Document jojo =
      new Document()
        .append("_id", jojoId)
        .append("name", "Jojo Siwa")
        .append("age", 45)
        .append("company", "OHMNET")
        .append("email", "sam@frogs.com");

    ctxPkDocuments.insertMany(testCtxPks);
    ctxPkDocuments.insertOne(jojo);

    ctxPkController = new ContextPackController(db);
  }

  @AfterAll
  public static void teardown() {
    db.drop();
    mongoClient.close();
  }

  @Test
  public void GetAllCtxPks() throws IOException {

    // Create our fake Javalin context
    Context ctx = ContextUtil.init(mockReq, mockRes, "api/ctxPks");
    ctxPkController.getContextPacks(ctx);


    assertEquals(200, mockRes.getStatus());

    String result = ctx.resultString();
    assertEquals(db.getCollection("ctxPks").countDocuments(), JavalinJson.fromJson(result, ContextPack[].class).length);
  }

  /*
  @Test
  public void GetUsersByAge() throws IOException {

    // Set the query string to test with
    mockReq.setQueryString("age=37");

    // Create our fake Javalin context
    Context ctx = ContextUtil.init(mockReq, mockRes, "api/users");

    userController.getUsers(ctx);

    assertEquals(200, mockRes.getStatus()); // The response status should be 200

    String result = ctx.resultString();
    User[] resultUsers = JavalinJson.fromJson(result, User[].class);

    assertEquals(2, resultUsers.length); // There should be two users returned
    for (User user : resultUsers) {
      assertEquals(37, user.age); // Every user should be age 37
    }
  }

  /**
  * Test that if the user sends a request with an illegal value in
  * the age field (i.e., something that can't be parsed to a number)
  * we get a reasonable error code back.
  *
  @Test
  public void GetUsersWithIllegalAge() {

    mockReq.setQueryString("age=abc");
    Context ctx = ContextUtil.init(mockReq, mockRes, "api/users");

    // This should now throw a `BadRequestResponse` exception because
    // our request has an age that can't be parsed to a number.
    assertThrows(BadRequestResponse.class, () -> {
      userController.getUsers(ctx);
    });
  }

  @Test
  public void GetUsersByCompany() throws IOException {

    mockReq.setQueryString("company=OHMNET");
    Context ctx = ContextUtil.init(mockReq, mockRes, "api/users");
    userController.getUsers(ctx);

    assertEquals(200, mockRes.getStatus());
    String result = ctx.resultString();

    User[] resultUsers = JavalinJson.fromJson(result, User[].class);

    assertEquals(2, resultUsers.length); // There should be two users returned
    for (User user : resultUsers) {
      assertEquals("OHMNET", user.company);
    }
  }

  @Test
  public void GetUsersByRole() throws IOException {

    mockReq.setQueryString("role=viewer");
    Context ctx = ContextUtil.init(mockReq, mockRes, "api/users");
    userController.getUsers(ctx);

    assertEquals(200, mockRes.getStatus());
    String result = ctx.resultString();
    for (User user : JavalinJson.fromJson(result, User[].class)) {
      assertEquals("viewer", user.role);
    }
  }

  @Test
  public void GetUsersByCompanyAndAge() throws IOException {

    mockReq.setQueryString("company=OHMNET&age=37");
    Context ctx = ContextUtil.init(mockReq, mockRes, "api/users");
    userController.getUsers(ctx);

    assertEquals(200, mockRes.getStatus());
    String result = ctx.resultString();
    User[] resultUsers = JavalinJson.fromJson(result, User[].class);

    assertEquals(1, resultUsers.length); // There should be one user returned
    for (User user : resultUsers) {
      assertEquals("OHMNET", user.company);
      assertEquals(37, user.age);
    }
  }

  @Test
  public void GetUserWithExistentId() throws IOException {

    String testID = samsId.toHexString();

    Context ctx = ContextUtil.init(mockReq, mockRes, "api/users/:id", ImmutableMap.of("id", testID));
    userController.getUser(ctx);

    assertEquals(200, mockRes.getStatus());

    String result = ctx.resultString();
    User resultUser = JavalinJson.fromJson(result, User.class);

    assertEquals(resultUser._id, samsId.toHexString());
    assertEquals(resultUser.name, "Sam");
  }

  @Test
  public void GetUserWithBadId() throws IOException {

    Context ctx = ContextUtil.init(mockReq, mockRes, "api/users/:id", ImmutableMap.of("id", "bad"));

    assertThrows(BadRequestResponse.class, () -> {
      userController.getUser(ctx);
    });
  }

  @Test
  public void GetUserWithNonexistentId() throws IOException {

    Context ctx = ContextUtil.init(mockReq, mockRes, "api/users/:id", ImmutableMap.of("id", "58af3a600343927e48e87335"));

    assertThrows(NotFoundResponse.class, () -> {
      userController.getUser(ctx);
    });
  }

  @Test
  public void AddUser() throws IOException {

    String testNewUser = "{"
      + "\"name\": \"Test User\","
      + "\"age\": 25,"
      + "\"company\": \"testers\","
      + "\"email\": \"test@example.com\","
      + "\"role\": \"viewer\""
      + "}";

    mockReq.setBodyContent(testNewUser);
    mockReq.setMethod("POST");

    Context ctx = ContextUtil.init(mockReq, mockRes, "api/users");

    userController.addNewUser(ctx);

    assertEquals(201, mockRes.getStatus());

    String result = ctx.resultString();
    String id = jsonMapper.readValue(result, ObjectNode.class).get("id").asText();
    assertNotEquals("", id);
    System.out.println(id);

    assertEquals(1, db.getCollection("users").countDocuments(eq("_id", new ObjectId(id))));

    //verify user was added to the database and the correct ID
    Document addedUser = db.getCollection("users").find(eq("_id", new ObjectId(id))).first();
    assertNotNull(addedUser);
    assertEquals("Test User", addedUser.getString("name"));
    assertEquals(25, addedUser.getInteger("age"));
    assertEquals("testers", addedUser.getString("company"));
    assertEquals("test@example.com", addedUser.getString("email"));
    assertEquals("viewer", addedUser.getString("role"));
    assertTrue(addedUser.containsKey("avatar"));
  }

  @Test
  public void AddInvalidEmailUser() throws IOException {
    String testNewUser = "{"
      + "\"name\": \"Test User\","
      + "\"age\": 25,"
      + "\"company\": \"testers\","
      + "\"email\": \"invalidemail\","
      + "\"role\": \"viewer\""
      + "}";
    mockReq.setBodyContent(testNewUser);
    mockReq.setMethod("POST");
    Context ctx = ContextUtil.init(mockReq, mockRes, "api/users");

    assertThrows(BadRequestResponse.class, () -> {
      userController.addNewUser(ctx);
    });
  }

  @Test
  public void AddInvalidAgeUser() throws IOException {
    String testNewUser = "{"
      + "\"name\": \"Test User\","
      + "\"age\": \"notanumber\","
      + "\"company\": \"testers\","
      + "\"email\": \"test@example.com\","
      + "\"role\": \"viewer\""
      + "}";
    mockReq.setBodyContent(testNewUser);
    mockReq.setMethod("POST");
    Context ctx = ContextUtil.init(mockReq, mockRes, "api/users");

    assertThrows(BadRequestResponse.class, () -> {
      userController.addNewUser(ctx);
    });
  }

  public void Add0AgeUser() throws IOException {
    String testNewUser = "{"
      + "\"name\": \"Test User\","
      + "\"age\": 0,"
      + "\"company\": \"testers\","
      + "\"email\": \"test@example.com\","
      + "\"role\": \"viewer\""
      + "}";
    mockReq.setBodyContent(testNewUser);
    mockReq.setMethod("POST");
    Context ctx = ContextUtil.init(mockReq, mockRes, "api/users");

    assertThrows(BadRequestResponse.class, () -> {
      userController.addNewUser(ctx);
    });
  }

  @Test
  public void AddNullNameUser() throws IOException {
    String testNewUser = "{"
      + "\"age\": 25,"
      + "\"company\": \"testers\","
      + "\"email\": \"test@example.com\","
      + "\"role\": \"viewer\""
      + "}";
    mockReq.setBodyContent(testNewUser);
    mockReq.setMethod("POST");
    Context ctx = ContextUtil.init(mockReq, mockRes, "api/users");

    assertThrows(BadRequestResponse.class, () -> {
      userController.addNewUser(ctx);
    });
  }

  @Test
  public void AddInvalidNameUser() throws IOException {
    String testNewUser = "{"
      + "\"name\": \"\","
      + "\"age\": 25,"
      + "\"company\": \"testers\","
      + "\"email\": \"test@example.com\","
      + "\"role\": \"viewer\""
      + "}";
    mockReq.setBodyContent(testNewUser);
    mockReq.setMethod("POST");
    Context ctx = ContextUtil.init(mockReq, mockRes, "api/users");

    assertThrows(BadRequestResponse.class, () -> {
      userController.addNewUser(ctx);
    });
  }

  @Test
  public void AddInvalidRoleUser() throws IOException {
    String testNewUser = "{"
      + "\"name\": \"Test User\","
      + "\"age\": 25,"
      + "\"company\": \"testers\","
      + "\"email\": \"test@example.com\","
      + "\"role\": \"invalidrole\""
      + "}";
    mockReq.setBodyContent(testNewUser);
    mockReq.setMethod("POST");
    Context ctx = ContextUtil.init(mockReq, mockRes, "api/users");

    assertThrows(BadRequestResponse.class, () -> {
      userController.addNewUser(ctx);
    });
  }

  public void AddNullCompanyUser() throws IOException {
    String testNewUser = "{"
      + "\"name\": \"Test User\","
      + "\"age\": 25,"
      + "\"email\": \"test@example.com\","
      + "\"role\": \"viewer\""
      + "}";
    mockReq.setBodyContent(testNewUser);
    mockReq.setMethod("POST");
    Context ctx = ContextUtil.init(mockReq, mockRes, "api/users");

    assertThrows(BadRequestResponse.class, () -> {
      userController.addNewUser(ctx);
    });
  }

  @Test
  public void AddInvalidCompanyUser() throws IOException {
    String testNewUser = "{"
      + "\"name\": \"\","
      + "\"age\": 25,"
      + "\"company\": \"\","
      + "\"email\": \"test@example.com\","
      + "\"role\": \"viewer\""
      + "}";
    mockReq.setBodyContent(testNewUser);
    mockReq.setMethod("POST");
    Context ctx = ContextUtil.init(mockReq, mockRes, "api/users");

    assertThrows(BadRequestResponse.class, () -> {
      userController.addNewUser(ctx);
    });
  }

  @Test
  public void DeleteUser() throws IOException {

    String testID = samsId.toHexString();

    // User exists before deletion
    assertEquals(1, db.getCollection("users").countDocuments(eq("_id", new ObjectId(testID))));

    Context ctx = ContextUtil.init(mockReq, mockRes, "api/users/:id", ImmutableMap.of("id", testID));
    userController.deleteUser(ctx);

    assertEquals(200, mockRes.getStatus());

    // User is no longer in the database
    assertEquals(0, db.getCollection("users").countDocuments(eq("_id", new ObjectId(testID))));
  }
*/
}
