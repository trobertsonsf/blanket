
test( "branch test", function() {
  ok( sampleTest(10) == "ten", "ten!" );
  ok( sampleTest(5) == "not ten", "not ten!" );
});

test( "branch test2", function() {
  ok( sampleTest2(5) == "five", "five!" );
  ok( sampleTest2(5) == "five", "five!" );
});

test( "branch test3", function() {
  ok( sampleTest3(12) == "greater than ten", "greater!" );
  //ok( sampleTest3(7) == "5-10", "5-10!" );
});

test( "branch test2", function() {
  ok( sampleTest4(6) == "not five", "not five!" );
  ok( sampleTest4(6) == "not five", "not five!" );
});

test( "multi line branch", function() {
  ok( sampleTest6(6) == "not five", "not five!" );
});

