package main.java.com.ejemplo.app.service;

import main.java.com.ejemplo.app.model.Item;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class ItemService {
    private final ObjectMapper om;

    @Value("${app.data.path:backend/data/items.json}")
    private String path;

    public ItemService(ObjectMapper om) { this.om = om; }

    public List<Item> getStudents() throws IOException {
        Path p = Path.of(path);
        ensureFile(p);
        return om.readValue(p.toFile(), new TypeReference<List<Item>>() {});
    }
    public Item createStuent(Item payload) throws IOException {
        List<Item> items = new ArrayList<>(getStudents());
        Number nextId = items.stream()
            .map(Item::getId)
            .filter(id -> id != null)
            .max(Comparator.naturalOrder())
            .orElse(1);
        
        Item created = new Item(nextId, input.getNombre(), input.getGrupo());
        items.add(created);

        Path p = Path.of(path);
        objectMapper.writerWithDefaultPrettyPrinter().writeValue(path.toFile(), items);
        return created;
    }
}
