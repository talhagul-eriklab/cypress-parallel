Feature: Search Google

  Scenario: Common search
    Given I'm at Google
    When I type search word 'github'
    And Press 'Search'
    Then I have some results