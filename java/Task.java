import java.io.*;
public class Task {
	public static void main(String args[]){
		File myObj = new File("task.txt");
		BufferedWriter writer = new BufferedWriter(myObj);
      for(int i = 0; i < tasks.length; i++) {
         writer.write(i +" "+tasks[i].toString());
         writer.newLine();
      }
		System.out.println("Hello, World!");

	}
}
