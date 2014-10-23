package extractor.eurostat;
import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import com.hp.hpl.jena.query.Query;
import com.hp.hpl.jena.query.QueryExecution;
import com.hp.hpl.jena.query.QueryExecutionFactory;
import com.hp.hpl.jena.query.QueryFactory;
import com.hp.hpl.jena.query.QuerySolution;
import com.hp.hpl.jena.query.ResultSet;
import com.hp.hpl.jena.query.ResultSetFormatter;


public class EUR_Extractor {
	
	static ArrayList<String> ids = new ArrayList<String>();

	public static void main (String args[]) {
		try {
			run();
		} catch (IOException e) {
			System.out.println(e.getMessage());
		}
	}

	private static void query(String id) throws IOException {

		String queryString = "";
		
		Query query = QueryFactory.create(queryString);
		QueryExecution qexec = QueryExecutionFactory.sparqlService("http://dbpedia.org/sparql", query);
		
		ResultSet rs = qexec.execSelect();
		if (rs.hasNext()){
			List<QuerySolution> list = ResultSetFormatter.toList(rs);
			list.get(0).get("bla");
		}
		qexec.close();
	}

	private static void run() throws IOException {
		getIds();
		for (int i=0; i<ids.size(); i++) {
			System.out.println("Processing " + (i+1) + "/" + ids.size() + " ID: " + ids.get(i));
			try {
				query(ids.get(i));
			} catch (Exception e) {
				System.out.println(e.getMessage());
			}
		}
	}
	
	private static void getIds() {
		try {
			FileReader fr = new FileReader("Resources/ids.txt");
			BufferedReader br = new BufferedReader(fr);
			String line;
			
			while((line = br.readLine()) != null) {
				ids.add(line);
			}
			br.close();
			
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}

