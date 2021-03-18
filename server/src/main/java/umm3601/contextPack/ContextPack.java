package umm3601.contextPack;

import org.mongojack.Id;
import org.mongojack.ObjectId;

import umm3601.wordList.WordList;

public class ContextPack {

  @ObjectId @Id
  public String _id;
  public String schema;
  public String name;
  public String icon;
  public boolean enabled;
  public Object[] wordlists;
}
