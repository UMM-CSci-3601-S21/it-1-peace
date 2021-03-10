package umm3601.wordList;

import org.mongojack.Id;
import org.mongojack.ObjectId;

public class WordList {

  @ObjectId @Id
  public String _id;

  public String name;
  public boolean enabled;
  public Word[] words;
}
