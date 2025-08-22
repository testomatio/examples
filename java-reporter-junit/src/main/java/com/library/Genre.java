package com.library;

import java.util.Objects;

public class Genre {

    private String id;

    private String name;

    private String description;

    private Genre parentGenre;

    public Genre(String id, String name, String description) {
        this.id = id;
        this.name = name;
        this.description = description;
    }

    public Genre(String id, String name, String description, Genre parentGenre) {
        this(id, name, description);
        this.parentGenre = parentGenre;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Genre getParentGenre() {
        return parentGenre;
    }

    public void setParentGenre(Genre parentGenre) {
        this.parentGenre = parentGenre;
    }

    public boolean hasParentGenre() {
        return parentGenre != null;
    }

    public String getFullPath() {
        if (parentGenre == null) {
            return name;
        }
        return parentGenre.getFullPath() + " > " + name;
    }

    public boolean isSubGenreOf(Genre other) {
        if (parentGenre == null) {
            return false;
        }
        if (parentGenre.equals(other)) {
            return true;
        }
        return parentGenre.isSubGenreOf(other);
    }

    public int getDepthLevel() {
        if (parentGenre == null) {
            return 0;
        }
        return parentGenre.getDepthLevel() + 1;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        Genre genre = (Genre) o;
        return Objects.equals(id, genre.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "Genre{" + "id='" + id + '\'' + ", name='" + name + '\'' + ", path='" + getFullPath() + '\'' + '}';
    }
}
