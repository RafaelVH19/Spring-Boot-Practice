package main.java.com.ejemplo.app.controller;

import main.java.com.ejemplo.app.model.Item;
import main.java.com.ejemplo.app.service.ItemService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/items")
public class ItemController {
    private final ItemService is;

    public ItemController(ItemService is) { this.is = is; }

    @GetMapping
    public List<item> getItems() throws IOException { return is.getStudents(); }

    @PostMapping
    public Item createItem(@RequestBody Item payload) throws IOException {
        return is.createStudent(payload);
    }
}