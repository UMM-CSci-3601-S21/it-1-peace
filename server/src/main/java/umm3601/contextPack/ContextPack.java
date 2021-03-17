package umm3601.contextPack;

import org.mongojack.Id;
import org.mongojack.ObjectId;

public class ContextPack {

  @ObjectId @Id
  public String _id;

  public String name;
  public String icon;
  public boolean enabled;
  public String wordlists;
}
