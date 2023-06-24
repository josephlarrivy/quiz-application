https://dbdiagram.io/d/6497294802bd1c4a5e023d66

Table users {
  id integer [primary key]
  username text
  name text
  password_hash text
}

Table categories {
  id integer [primary key]
  name varchar [note: 'Category Name']
}

Table tags {
  id integer [primary key]
  name varchar [note: 'Tag Name']
}

Table questions {
  id integer [primary key]
  question_text text
  category_id integer
  points integer
  creator_id integer
  created_at timestamp
}

Table questions_tags {
  question_id integer
  tag_id integer
  created_at timestamp
  primary key (question_id, tag_id)
}

Table categories_tags {
  category_id integer
  tag_id integer
  created_at timestamp
  primary key (category_id, tag_id)
}



Ref: questions.category_id > categories.id // many-to-one
Ref: questions.point_id > points.id // many-to-one
Ref: questions.creator_id > users.id // many-to-one
Ref: questions_tags.question_id > questions.id // many-to-one
Ref: questions_tags.tag_id > tags.id // many-to-one
Ref: categories_tags.category_id > categories.id // many-to-one
Ref: categories_tags.tag_id > tags.id // many-to-one


