
import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpExchange;

import java.net.InetSocketAddress;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;

public class CartzeeServer {

    public static void main(String[] args) {

        try {
            // Automatically select an available port
            HttpServer server = HttpServer.create(
                new InetSocketAddress("localhost", 0), 0
            );

            // Health API
            server.createContext("/api/health", exchange -> {

                addCors(exchange);

                if (exchange.getRequestMethod().equals("OPTIONS")) {
                    exchange.sendResponseHeaders(204, -1);
                    exchange.close();
                    return;
                }

                send(exchange, 200,
                    "CARTZEE BACKEND CONNECTED SUCCESSFULLY!");
            });

            // Login API
            server.createContext("/api/auth/login", exchange -> {

                addCors(exchange);

                if (exchange.getRequestMethod().equals("OPTIONS")) {
                    exchange.sendResponseHeaders(204, -1);
                    exchange.close();
                    return;
                }

                if (!exchange.getRequestMethod().equals("POST")) {
                    send(exchange, 405, "POST method required");
                    return;
                }

                String body = new String(
                    exchange.getRequestBody().readAllBytes(),
                    StandardCharsets.UTF_8
                );

                if (body.contains("\"email\"") &&
                    body.contains("\"password\"")) {

                    send(exchange, 200,
                        "CARTZEE LOGIN API CONNECTED SUCCESSFULLY!");

                } else {

                    send(exchange, 400,
                        "Email and password required");
                }
            });

            // Start server
            server.start();

            int port = server.getAddress().getPort();

            System.out.println("--------------------------------");
            System.out.println("  CARTZEE BACKEND STARTED!");
            System.out.println("--------------------------------");
            System.out.println("Server: http://localhost:" + port);
            System.out.println("Health: http://localhost:" + port + "/api/health");
            System.out.println("Login:  http://localhost:" + port + "/api/auth/login");
            System.out.println("--------------------------------");

        } catch (IOException e) {
            System.out.println("BACKEND START FAILED!");
            e.printStackTrace();
        }
    }

    // CORS Configuration
    static void addCors(HttpExchange exchange) {

        exchange.getResponseHeaders().set(
            "Access-Control-Allow-Origin", "*"
        );

        exchange.getResponseHeaders().set(
            "Access-Control-Allow-Methods", "GET, POST, OPTIONS"
        );

        exchange.getResponseHeaders().set(
            "Access-Control-Allow-Headers", "Content-Type"
        );
    }

    // API Response
    static void send(
        HttpExchange exchange,
        int status,
        String message
    ) throws IOException {

        byte[] response = message.getBytes(
            StandardCharsets.UTF_8
        );

        exchange.getResponseHeaders().set(
            "Content-Type", "text/plain; charset=UTF-8"
        );

        exchange.sendResponseHeaders(status, response.length);

        try (OutputStream output = exchange.getResponseBody()) {
            output.write(response);
        }
    }
}
