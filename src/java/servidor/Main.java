package servidor;

import java.io.IOException;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;
import javax.websocket.OnError;
import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

@ServerEndpoint(value = "/xadrez")
public class Main {

    private static Set<Session> peers = Collections.synchronizedSet(new HashSet<Session>());

    @OnOpen
    public void onOpen(Session session) {
        peers.add(session);
        System.out.println(session.getId() + " iniciou uma conexao");
        try {
            session.getBasicRemote().sendText("Conexao estabelecida");
        } catch (IOException ex) {
            ex.printStackTrace();
        }
    }

    @OnMessage
    public void onMessage(String message, Session session) throws IOException {
        System.out.println("Mensagem da conexao " + session.getId() + ": '" + message + "'");
        for (Session peer : peers) {
            if (!peer.equals(session)) {
                peer.getBasicRemote().sendText("foi recebido: '" + message + "' da conexao " + session.getId());
            }
        }
    }

    @OnClose
    public void onClose(Session session) {
        peers.remove(session);
        System.out.println("Conexao " + session.getId() + " foi encerrada");
    }

    @OnError
    public void onError(Session session, Throwable t) {
        System.out.println("Erro na conexao " + session.getId() + " : " + t.getMessage());
    }
}
